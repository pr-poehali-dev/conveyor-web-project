import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event, context):
    """Отправка заявки с сайта КонвейерСервис на email"""

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

    smtp_host = os.environ.get('SMTP_HOST', '')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    notify_email = os.environ.get('NOTIFY_EMAIL', smtp_user)

    if not smtp_host or not smtp_user or not smtp_password:
        return {'statusCode': 500, 'headers': cors, 'body': json.dumps({'error': 'SMTP не настроен'})}

    subject = f'Новая заявка с сайта от {name}'
    html_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #e8690a;">Новая заявка с сайта КонвейерСервис</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Имя:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">{name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Телефон:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">{phone}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">{email or 'не указан'}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Сообщение:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">{message or 'не указано'}</td></tr>
        </table>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">Отправлено с сайта КонвейерСервис</p>
    </body>
    </html>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = smtp_user
    msg['To'] = notify_email
    msg.attach(MIMEText(html_body, 'html'))

    if smtp_port == 465:
        server = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=10)
    else:
        server = smtplib.SMTP(smtp_host, smtp_port, timeout=10)
        server.starttls()

    server.login(smtp_user, smtp_password)
    server.sendmail(smtp_user, [notify_email], msg.as_string())
    server.quit()

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'success': True, 'message': 'Заявка отправлена'}),
    }