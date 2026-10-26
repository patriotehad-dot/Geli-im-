# Zombi mimarisi

Zombi, tek bir merkezden yönetilen görsel ve yapısal bir sistem tanımıdır. Mimarisi üç temel katmandan oluşur:

## 1. Manifest katmanı

- `config/system.toml`
- `config/system.yaml`

Bu dosyalar sistemin kimliği, modülleri, güvenlik durumu, durum akışı ve metadata bilgilerini tutar.

## 2. Doğrulama katmanı

- `scripts/validate.sh`
- `scripts/validate_zombi.py`

Bu katman, gerekli alanların varlığını, doğru biçimleri ve temel bütünlüğü kontrol eder.

## 3. Dokümantasyon katmanı

- `README.md`
- `docs/overview.md`
- `docs/manifest-spec.md`

Dokümantasyon katmanı, hem kullanıcıları hem de otomasyon ekosistemini bilgilendirir.

## Akış

1. Sistem tanımı yazılır.
2. Manifest dosyaları güncellenir.
3. Doğrulama aracı çalıştırılır.
4. Durum, güvenlik ve modül bilgileri kontrol edilir.
5. Daha sonra dokümantasyon ve otomasyon için kullanılabilir.

## Temel prensipler

- Tek kaynak, çoklu format: TOML + YAML
- Durum bilgisi merkezileştirilmiştir
- Güvenlik ve izin politikaları açıkça yazılır
- Modül bazlı yapı düzeni korunur
- Sistemin sürümü ve güncelleme bilgileri tutulur
