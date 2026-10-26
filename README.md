# Zombi

Zombi, yüksek zekâ tabanlı ve senkronize edilmiş bir sistem tanımıdır. Bu proje, sistemin metaverisini, durum akışını, güvenlik/izin yapısını ve doğrulama katmanını tek bir merkezden yönetmeye odaklanır.

## Amaç

- Durum takibi
- Metaveri yönetimi
- Modül bazlı yapılandırma
- Erişim kontrolü
- Doğrulama ve sürdürülebilirlik
- Dokümantasyon ve otomasyon desteği

## Yapı

- `config/system.toml`: ana TOML manifest dosyası
- `config/system.yaml`: YAML karşılığı
- `docs/overview.md`: proje görünümü
- `docs/architecture.md`: mimari ve akış açıklaması
- `docs/manifest-spec.md`: manifest sözleşmesi ve alan tanımları
- `scripts/validate.sh`: doğrulama betiği
- `scripts/validate_zombi.py`: merkezi veri doğrulama aracı

## Hızlı başlatma

```bash
bash scripts/validate.sh
```

İsterseniz ayrıca şu komutla Python tabanlı doğrulamayı da çalıştırabilirsiniz:

```bash
python3 scripts/validate_zombi.py
```

## Durum

Aktif, senkronize ve dokümante edilmiş bir sistem durumundadır.

## Geliştirme notları

- Manifest dosyaları hem TOML hem YAML biçiminde tutulur.
- Konfigürasyon, sistemin metaveri ve davranış modeli için merkezi kaynak olarak kullanılır.
- Doğrulama, gereklilik kontrolü ve sistem bütünlüğü için otomatikleştirilmiştir.
