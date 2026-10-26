# Zombi ve repo tanımı

Bu belge, repository yapısını, `config/system.toml` içindeki tanımları ve proje genelini açıklamak için hazırlanmıştır.

## 1. Repository genel görünüm

Bu repo, temel olarak VS Code kaynak kodu yapısı ve ek olarak özel bir `Zombi` manifest sistemine ait tanımları barındırır.

### Ana klasörler

- `.github/` — GitHub ayarları, iş akışları, Copilot talimatları ve repo metadata yapılandırması.
- `src/` — ana TypeScript kaynak kodu. `vs/base`, `vs/platform`, `vs/workbench`, `vs/editor`, `vs/code` gibi katmanlar bulunur.
- `extensions/` — VS Code’a dahil edilen dahili uzantılar.
- `build/` — derleme betikleri ve CI/CD araçları.
- `test/` — entegrasyon testleri ve test altyapısı.
- `scripts/` — geliştirme, derleme ve doğrulama betikleri.
- `resources/` — ikonlar, temalar ve statik kaynaklar.
- `docs/` — dokümantasyon belgeleri.
- `cli/` — komut satırı arayüzü bileşenleri.
- `config/` — yapılandırma dosyaları.
- `remote/` — uzak bağlantı ve ilgili kodlar.

## 2. `config/system.toml` anlamı

Bu dosya bir TOML yapılandırma dosyasıdır. Kod içindeki fonksiyon tanımı değil; sistemin metadata, durum, güvenlik ve modül bilgilerini tutan manifest dosyasıdır.

### 2.1. Üst seviye değişkenler

- `title` = "Zombi" — sistemin adıdır.
- `version` = "2.0.0" — sürüm numarasıdır.
- `status` = "active" — sistemin durumudur.
- `category` = "ai-system" — sistem kategorisidir.

### 2.2. `[system]`

- `id` = "zombi-system" — sistem kimlik bilgisidir.
- `description` = "Yüksek zekâ tabanlı ve senkronize edilmiş sistem tasarımı..." — sistem açıklamasıdır.

### 2.3. `[identity]`

- `author_name` = "EHAD TONGUZ" — yazar adı.
- `author_email` = "patriot.ehad@gmail.com" — iletişim e-postası.
- `owner_organization` = "patriotehad-dot" — sahip kuruluş.
- `owner_repository` = "Geli-im-" — sahip repo.
- `description` = "Zombi, proje içi durum takibi, metadata yönetimi ve otomasyon için tasarlanmış yapılandırılmış bir sistem tanımıdır." — kimlik açıklaması.

### 2.4. `[state]`

- `current` = "synchronized" — mevcut durum.
- `lifecycle` = ["initialized", "normalized", "metadata-expanded", "validated", "synchronized"] — geçiş sırası.
- `history` = [...] — durum geçmişi.

`[state.transitions]` altında durum geçişleri tanımlanmıştır:

- `initialized -> normalized`
- `normalized -> metadata-expanded`
- `metadata-expanded -> validated`
- `validated -> synchronized`

Bu alan, sistemin akış mantığını ifade eder.

### 2.5. `[environment]`

- `type` = "repository" — çalışma ortamı tipidir.
- `branch` = "DileepY/revert_notifications" — aktif dal.
- `runtime` = "static-text" — çalışma zamanı tipi.
- `deployment_target` = "github-repository" — dağıtım hedefi.
- `platform` = "github" — platform.

### 2.6. Modüller (`[modules.*]`)

Her modül şu alanları taşır:

- `name`
- `status`
- `description`

Mevcut modüller:

- `modules.core` → `zombi-core` — ana sistem davranışını yönetir.
- `modules.metadata` → `zombi-metadata` — metadata ve tanımlayıcı bilgileri tutar.
- `modules.sync` → `zombi-sync` — durum senkronizasyonunu yönetir.
- `modules.security` → `zombi-security` — izin ve güvenlik kontrolünü sağlar.
- `modules.validation` → `zombi-validation` — bütünlük ve kalite denetimi yapar.

### 2.7. İzinler ve güvenlik

`[permissions]`

- `read = true`
- `write = true`
- `execute = false`
- `admin = false`

`[security]`

- `public = true`
- `sensitive = false`
- `encrypted = false`
- `audit_enabled = true`

### 2.8. Metadata ve etiketler

`[metadata]`

- `created_at` = "2026-10-26"
- `updated_at` = "2026-10-26"
- `last_sync` = "2026-10-26T11:58:36Z"
- `tags` = ["zombi", "ai", "system", "sync", "automation", "metadata", "project-manifest", "validation"]

### 2.9. Notlar (`[[notes]]`)

Bu alan, sistemin tarihsel ve açıklayıcı notlarını barındıran dizi nesneleridir.

- Sistem orijinal olarak binary formatta ortaya çıktı.
- Daha sonra okunabilir metin ve manifest biçimine dönüştürüldü.
- Bu yapı, proje içi tanımlayıcı ve durumsal bilgi için kullanılabilir.
- Sistem geliştirme sürecinde doğrulama ve belgeleme katmanı entegre edildi.

## 3. Fonksiyon var mı?

Bu dosyada tam anlamıyla programlama fonksiyonu yoktur. Burada tanımlananlar:

- string değerler
- boolean değerler
- dizi (array) değerler
- nested object / section tanımları
- durum geçiş haritası

Dolayısıyla bu bir çalışma kodu değil, bir konfigürasyon/manifest dosyasıdır.

## 4. Kısa özet

Bu repo, temelde bir VS Code kaynak deposu görünümüne sahip olsa da, `config/system.toml` içinde özel bir `Zombi` sistemi tanımı yer alır. Bu tanım şunları hedefler:

- sistem kimliği
- durum takibi
- modül organizasyonu
- güvenlik ve izinler
- metadata yönetimi
- otomasyon ve doğrulama

## 5. Yasal / teknik not

Bu yapı, bir uygulama çalıştıran sistemden çok, sistemin kendisini tarif eden bir konfigürasyon manifesti şeklindedir. Kod çalıştırılmadığı için fonksiyon çağrıları burada yer almaz.

## 6. Kaynaklar

- `README.md`
- `config/system.toml`
- `.github/copilot-instructions.md`
- repo root klasör yapısı

Bu dosya, repo ve manifest bilgilerini tek bir yerde özetler.
