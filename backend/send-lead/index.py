import json
import os
import urllib.request
import urllib.parse

import psycopg2


def handler(event, context):
    """Сохранение заявки в БД и отправка уведомления в Telegram"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    cors = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}

    raw_body = event.get('body') or '{}'
    if isinstance(raw_body, str):
        body = json.loads(raw_body)
        if isinstance(body, str):
            body = json.loads(body)
    else:
        body = raw_body
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not name or not phone:
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Имя и телефон обязательны'})}

    ip = (event.get('requestContext') or {}).get('identity', {}).get('sourceIp', '')

    db_url = os.environ.get('DATABASE_URL', '')
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    tg_sent = False

    if db_url:
        conn = psycopg2.connect(db_url)
        conn.autocommit = True
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO " + schema + ".leads (name, phone, email, message, ip, email_sent) "
            "VALUES (%s, %s, %s, %s, %s, FALSE) RETURNING id",
            (name, phone, email or None, message or None, ip or None)
        )
        lead_id = cur.fetchone()[0]
        cur.close()
        conn.close()

    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')

    if bot_token and chat_id:
        text = (
            "📋 *Новая заявка с сайта ReBelt*\n\n"
            f"👤 *Имя:* {_escape_md(name)}\n"
            f"📞 *Телефон:* {_escape_md(phone)}\n"
            f"✉️ *Email:* {_escape_md(email or 'не указан')}\n"
            f"💬 *Сообщение:* {_escape_md(message or 'не указано')}"
        )

        payload = json.dumps({
            'chat_id': chat_id,
            'text': text,
            'parse_mode': 'MarkdownV2',
        }).encode('utf-8')

        req = urllib.request.Request(
            f'https://api.telegram.org/bot{bot_token}/sendMessage',
            data=payload,
            headers={'Content-Type': 'application/json'},
            method='POST',
        )
        resp = urllib.request.urlopen(req, timeout=10)
        if resp.status == 200:
            tg_sent = True

        if db_url and tg_sent:
            conn = psycopg2.connect(db_url)
            conn.autocommit = True
            cur = conn.cursor()
            cur.execute("UPDATE " + schema + ".leads SET email_sent = TRUE WHERE id = %s", (lead_id,))
            cur.close()
            conn.close()

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'success': True, 'message': 'Заявка принята', 'tg_sent': tg_sent}),
    }


def _escape_md(text):
    special = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!']
    for ch in special:
        text = text.replace(ch, '\\' + ch)
    return text
