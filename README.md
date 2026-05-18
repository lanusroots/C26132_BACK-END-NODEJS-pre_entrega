# FAKE-API 🛒

CLI para gestionar productos desde la [FakeStore API](https://fakestoreapi.com) directamente en tu terminal. Soporta operaciones GET, POST y DELETE.

## Requisitos

- Node.js v18 o superior (incluye `fetch` nativo)

## Instalación

```bash
git clone <tu-repo>
cd fake-api
```

No requiere instalar dependencias.

## Uso

```bash
npm start <METHOD> <resource> [argumentos]
```

### Comandos disponibles

|------------|------------------------------------------------------|---------------------------|
| Operación  |                     Comando                          | Descripción               |
|------------|------------------------------------------------------|---------------------------|
|  GET todos | `npm start GET products`                             | Lista todos los productos |
| GET por ID | `npm start GET products/<id>`                        | Busca un producto por ID  |
|    POST    | `npm start POST products <title> <price> <category>` | Crea un producto          |
|   DELETE   | `npm start DELETE products/<id>`                     | Elimina un producto       |
|------------|------------------------------------------------------|---------------------------|

---

## Probar el funcionamiento

### 1. Traer todos los productos

```bash
npm start GET products
```

Salida esperada:
```
📦 Total de productos: 20

  [1] Fjallraven - Foldsack No. 1 Backpack
       💲109.95  |  📂 men's clothing

  [2] Mens Casual Premium Slim Fit T-Shirts
       💲22.3  |  📂 men's clothing
  ...
```

---

### 2. Traer un producto por ID

```bash
npm start GET products/3
```

Salida esperada:
```
🔍 Producto encontrado:

  Título     : Mens Cotton Jacket
  Precio     : $55.99
  Categoría  : men's clothing
  Descripción: great outerwear jackets for spring...
```

Probá con un ID inexistente para ver el manejo de error:
```bash
npm start GET products/9999
```
```
❌ No se encontró el producto con id: 9999
```

---

### 3. Crear un producto

```bash
npm start POST products Remera 299 remeras
```

Salida esperada:
```
✅ Producto creado:

  ID         : 21
  Título     : Remera
  Precio     : $299
  Categoría  : remeras
```

> **Nota:** La FakeStore API simula la creación y devuelve un ID, pero el producto no se guarda realmente.

---

### 4. Eliminar un producto

```bash
npm start DELETE products/3
```

Salida esperada:
```
🗑️  Producto eliminado:

  ID     : 3
  Título : Mens Cotton Jacket
```

Probá con un ID inexistente:
```bash
npm start DELETE products/9999
```
```
❌ No se pudo eliminar el producto con id: 9999
```

---

### 5. Comando sin argumentos (manejo de error)

```bash
npm start
```
```
❌ Uso: npm run start <METHOD> <resource>
   Ejemplos:
     npm run start GET products
     npm run start GET products/5
     npm run start POST products Remera 299 remeras
     npm run start DELETE products/3
```

---

## Estructura del proyecto

```
fake-api/
├── index.js       # Lógica principal + enrutador
├── package.json
└── README.md
```

## API utilizada

[FakeStore API](https://fakestoreapi.com) — API pública y gratuita para prototipos y pruebas. Los cambios con POST y DELETE no persisten en el servidor.

## Autor

**MaxFernandez**

## Licencia

ISC