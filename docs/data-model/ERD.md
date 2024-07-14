# ERD

```mermaid
erDiagram
  users {
    uuid id PK
    string first_name
    string last_name
    string email UK
    string password_hash
    boolean email_verified
    string two_factor_secret
    timestamptz created_at
    timestamptz updated_at
  }

  sessions {
    uuid id PK
    uuid user_id FK
    timestamptz expires_at
    boolean fresh
  }

  email_verification_codes {
    uuid id PK
    uuid user_id FK
    string code
    string email
    timestamptz expires_at
  }

  password_reset_tokens {
    string token_hash PK
    uuid user_id FK
    timestamptz expires_at
  }

  users ||--o| email_verification_codes : foreign_key
  users ||--o| password_reset_tokens : foreign_key
  users ||--o| sessions : foreign_key
```
