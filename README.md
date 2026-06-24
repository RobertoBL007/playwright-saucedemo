# 🎭 Suite de Automatización de Tests — Saucedemo

Suite de testing end-to-end y de API para [Saucedemo](https://www.saucedemo.com), construida con Playwright y TypeScript siguiendo buenas prácticas del sector: Page Object Model, fixtures personalizados e integración CI/CD.

## 🛠️ Stack tecnológico

- **Playwright** — Framework de testing E2E y API
- **TypeScript** — Código de tests con tipado seguro
- **Page Object Model (POM)** — Arquitectura de tests mantenible y escalable
- **GitHub Actions** — Integración continua

## 📁 Estructura del proyecto

```
Auto1/
├── pages/              # Clases del Page Object Model
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── CartPage.ts
├── tests/
│   ├── login.spec.ts   # Casos de prueba de autenticación
│   ├── cart.spec.ts    # Flujos del carrito de compra
│   ├── api.spec.ts     # Testing de API e interceptación de red
│   └── fixtures.ts     # Fixture personalizado: sesión autenticada
├── playwright.config.ts
└── .github/workflows/  # Pipeline de CI
```

## ✅ Qué cubre

- **Autenticación** — login correcto, credenciales incorrectas, usuario bloqueado
- **Flujos de carrito** — añadir uno o varios productos, validación del carrito
- **Testing de API** — peticiones GET/POST, validación de status code y body
- **Interceptación de red** — simulación de errores de servidor con `route.fulfill()`
- **Variables de entorno** — credenciales gestionadas vía `.env` (sin hardcodear)
- **Testing multi-navegador** — Chromium, Firefox, WebKit
- **CI/CD** — ejecución automática de tests en GitHub Actions

## 🚀 Cómo ejecutarlo

```bash
# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install

# Crear un archivo .env con:
# SAUCE_USER=standard_user
# SAUCE_PASS=secret_sauce

# Ejecutar todos los tests
npx playwright test

# Ejecutar en un navegador específico
npx playwright test --project=chromium
```

## 📊 Reportes

Este proyecto genera dos tipos de informes:

- **Nativo de Playwright** — rápido, ideal para desarrollo diario
```bash
  npx playwright show-report
```

- **Allure Report** — informe visual con categorías, severidad y gráficos de tendencias
```bash
  npx allure generate allure-results --clean
  npx allure open
```

## 👤 Autor

**Roberto Blasco**
QA Engineer | Certificado ISTQB Foundation & Agile Tester
[LinkedIn](https://www.linkedin.com/in/roberto-blasco-lópez-qa/) · [GitHub](https://github.com/RobertoBL007)