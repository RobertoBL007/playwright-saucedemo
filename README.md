# 🎭 Suite de Automatización de Tests — Saucedemo

[![Playwright Tests](https://github.com/RobertoBL007/playwright-saucedemo/actions/workflows/playwright.yml/badge.svg)](https://github.com/RobertoBL007/playwright-saucedemo/actions/workflows/playwright.yml)

Suite de testing end-to-end y de API para [Saucedemo](https://www.saucedemo.com), construida con Playwright y TypeScript siguiendo buenas prácticas del sector: Page Object Model, fixtures personalizados, datos parametrizados y CI/CD con reportes profesionales.

## 🛠️ Stack tecnológico

- **Playwright** — Framework de testing E2E y API
- **TypeScript** — Código de tests con tipado seguro
- **Page Object Model (POM)** — Arquitectura de tests mantenible y escalable
- **Allure Report** — Reportes visuales con categorías y severidad
- **GitHub Actions** — Integración continua

## 📁 Estructura del proyecto

```
Auto1/
├── pages/                  # Clases del Page Object Model
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── FooterPage.ts
├── tests/
│   ├── login.spec.ts       # Autenticación + tests parametrizados de checkout
│   ├── cart.spec.ts        # Flujos del carrito de compra
│   ├── api.spec.ts         # Testing de API e interceptación de red
│   ├── footer.spec.ts      # Validación de enlaces del footer
│   └── fixtures.ts         # Fixture personalizado: sesión autenticada
├── fixtures/data/          # Datos de prueba externos
│   ├── users.json
│   └── namesForPay.json
├── playwright.config.ts
└── .github/workflows/      # Pipeline de CI con Allure
```

## ✅ Qué cubre

- **Autenticación** — login correcto, credenciales incorrectas, usuario bloqueado
- **Tests parametrizados** — login con múltiples usuarios y checkout con múltiples compradores, usando datos externos en JSON
- **Flujos de carrito y checkout** — añadir productos, validación del carrito, flujo completo de compra
- **Testing de API** — peticiones GET/POST, validación de status code y body
- **Interceptación de red** — simulación de errores de servidor con `route.fulfill()`
- **Variables de entorno** — credenciales gestionadas vía `.env` (sin hardcodear)
- **Testing multi-navegador** — Chromium, Firefox, WebKit
- **CI/CD** — ejecución automática de tests y generación de reportes en GitHub Actions

## 🤖 Desarrollo asistido por IA

Parte de este proyecto se ha construido con apoyo de **Claude** (Anthropic) como herramienta de aprendizaje y generación de código, incluyendo Claude Code integrado en VS Code. Todo el código generado por IA se revisa críticamente antes de integrarse: en este proyecto se han detectado y corregido casos reales como aserciones mal ubicadas dentro de clases POM, fixtures innecesarios y métodos redundantes — aplicando siempre el mismo criterio de calidad que al código escrito a mano.

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

Este proyecto genera dos tipos de informes, ambos disponibles también como artefactos descargables en cada ejecución de GitHub Actions:

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