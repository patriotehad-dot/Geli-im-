# Zombi manifest spesifikasyonu

Bu belge, `config/system.toml` ve `config/system.yaml` dosyalarının beklenen yapısını açıklar.

## Gerekli üst seviye alanlar

- `title`
- `version`
- `status`
- `category`
- `system`
- `identity`
- `state`
- `environment`
- `modules`
- `permissions`
- `security`
- `metadata`

## Alan tanımları

### `title`
Sistem adı.

### `version`
Sistem sürüm numarası.

### `status`
Durum ifadesi. Örneğin: `active`.

### `category`
Sistem kategorisi. Örneğin: `ai-system`.

### `system`
Sistem kimliği ve tanım bilgilerini içerir.

Gerekli alt alanlar:
- `id`
- `description`

### `identity`
Yazar, sahiplik ve genel kimlik bilgilerini içerir.

Gerekli alt alanlar:
- `author_name` / `author.name`
- `author_email` / `author.email`
- `owner_organization` / `owner.organization`
- `owner_repository` / `owner.repository`
- `description`

### `state`
Durum takibi için kullanılır.

Gerekli alt alanlar:
- `current`
- `lifecycle`
- `history`
- `transitions`

### `environment`
Yerel veya uzak ortam bilgilerini içerir.

Gerekli alt alanlar:
- `type`
- `branch`
- `runtime`
- `deployment_target`
- `platform`

### `modules`
Modül bazlı yapı için kullanılır.

Örnek modüller:
- `core`
- `metadata`
- `sync`
- `security`
- `validation`

### `permissions`
İzin tanımları.

Örneğin:
- `read`
- `write`
- `execute`
- `admin`

### `security`
Güvenlik ve denetim ayarları.

Örneğin:
- `public`
- `sensitive`
- `encrypted`
- `audit_enabled`

### `metadata`
Sistem meta bilgileri.

Örneğin:
- `created_at`
- `updated_at`
- `last_sync`
- `tags`

## Beklenen doğrulama kuralları

- `title` alanı `Zombi` olmalıdır.
- `status` alanı `active` olmalıdır.
- `state.current` ile `state.lifecycle` tutarlı olmalıdır.
- `modules.*.status` alanları `active` veya geçerli bir durum değeri olmalıdır.
- `security.audit_enabled` doğrulama için zorunludur.
- `metadata.tags` dizi formatında olmalıdır.

## Notlar

Bu manifest yapısı hem insan tarafından okunabilir hem de makine tarafından doğrulanabilir niteliktedir.
