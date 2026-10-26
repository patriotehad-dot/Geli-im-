# Zombi proje görünümü

Bu belge, projenin temel amacı, dosya yapısı ve sistem profilini anlatır.

## Amaç

Zombi, proje içi tanımlayıcı bilgileri, durum akışını, modül ayrımını ve güvenlik denetimini tek bir konfigürasyon merkezinde toplar.

## Temel hedefler

- Durum takibi
- Meta veri yönetimi
- Modül bazlı organizasyon
- Erişim kontrolü
- Doğrulama ve sürdürülebilirlik
- Dijital manifest dosyası olarak kullanılabilirlik

## Yapı

- `config/system.toml`: ana TOML tanımı
- `config/system.yaml`: okunabilir YAML sürümü
- `docs/overview.md`: kısa görünüm
- `docs/architecture.md`: mimari açıklama
- `docs/manifest-spec.md`: alan ve kurallar dokümantasyonu
- `scripts/validate.sh`: doğrulama betiği
- `scripts/validate_zombi.py`: Python tabanlı doğrulama aracı

## Durum

Sistem aktif ve senkronize konumdadır.

## Çalıştırma

```bash
bash scripts/validate.sh
```

veya

```bash
python3 scripts/validate_zombi.py
```
