const IMG_1 = "https://cdn.poehali.dev/projects/46438581-134f-4116-a078-ece934f09d20/files/56a48e5c-5656-4df7-b35a-7cabec99c328.jpg";
const IMG_2 = "https://cdn.poehali.dev/projects/46438581-134f-4116-a078-ece934f09d20/files/6412ad52-9f43-4a9c-a29d-3c65b6b67f7d.jpg";
const IMG_3 = "https://cdn.poehali.dev/projects/46438581-134f-4116-a078-ece934f09d20/files/ea5cd9f7-7945-4baa-a263-347e025715cd.jpg";

const images = [
  { src: IMG_1, alt: "Стыковка конвейерной ленты", caption: "Горячая вулканизация в полевых условиях" },
  { src: IMG_2, alt: "Конвейерная система", caption: "Обслуживание конвейера на горном карьере" },
  { src: IMG_3, alt: "Вулканизационный пресс", caption: "Работа с вулканизационным прессом" },
];

const GallerySection = () => (
  <section id="gallery" className="py-24 metal-bg">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="steel-line w-12" />
          <span className="text-primary font-medium text-sm uppercase tracking-widest">Галерея</span>
          <div className="steel-line w-12 rotate-180" />
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase">
          Наши <span className="text-primary">работы</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.alt} className="group relative overflow-hidden rounded-lg">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-heading text-sm uppercase">{img.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
