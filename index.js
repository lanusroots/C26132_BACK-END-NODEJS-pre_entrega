const BASE_URL = "https://fakestoreapi.com"

// Capturamos los argumentos desde la terminal
const [, , method, resource, ...rest] = process.argv

// Creamos la lógica ( CRUD )
async function getAllProducts() {
  const res = await fetch(`${BASE_URL}/products`)
  const products = await res.json()

  console.log(`\n📦 Total de productos: ${products.length}\n`)
  products.forEach(({ id, title, price, category }) => {
    console.log(`  [${id}] ${title}`)
    console.log(`       💲${price}  |  📂 ${category}\n`)
  })
}

async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`)

  if (!res.ok) {
    console.error(`❌ No se encontró el producto con id: ${id}`)
    return
  }

  const { title, price, category, description } = await res.json()

  console.log("\n🔍 Producto encontrado:\n")
  console.log(`  Título     : ${title}`)
  console.log(`  Precio     : $${price}`)
  console.log(`  Categoría  : ${category}`)
  console.log(`  Descripción: ${description}`)
}

async function createProduct([title, price, ...categoryParts]) {
  if (!title || !price || categoryParts.length === 0) {
    console.error(
      "❌ Uso correcto: npm run start POST products <title> <price> <category>"
    )
    return
  }

  const category = categoryParts.join(" ")

  const newProduct = {
    title,
    price: Number(price),
    category,
  }

  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  })

  const created = await res.json()

  console.log("\n✅ Producto creado:\n")
  console.log(`  ID         : ${created.id}`)
  console.log(`  Título     : ${created.title}`)
  console.log(`  Precio     : $${created.price}`)
  console.log(`  Categoría  : ${created.category}\n`)
}

async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    console.error(`❌ No se pudo eliminar el producto con id: ${id}`)
    return
  }

  const deleted = await res.json()
  console.log(`\n🗑️  Producto eliminado:\n`)
  console.log(`  ID     : ${deleted.id}`)
  console.log(`  Título : ${deleted.title}\n`)
}

// Aplicamos un enrutador

async function main() {
  if (!method || !resource) {
    console.error("❌ Uso: npm run start <METHOD> <resource>")
    console.error("   Ejemplos:")
    console.error("     npm run start GET products")
    console.error("     npm run start GET products/5")
    console.error("     npm run start POST products Remera 299 remeras")
    console.error("     npm run start DELETE products/3")
    return
  }

  // Separamos el recurso para detectar si viene con ID (ej: "products/15")
  const [, productId] = resource.split("/")

  switch (method.toUpperCase()) {
    case "GET":
      if (productId) {
        await getProductById(productId)
      } else {
        await getAllProducts()
      }
      break

    case "POST":
      // rest = [<title>, <price>, <category...>]
      await createProduct(rest)
      break

    case "DELETE":
      if (!productId) {
        console.error("❌ Indicá el id del producto: npm run start DELETE products/<id>");
        return
      }
      await deleteProduct(productId)
      break

    default:
      console.error(`❌ Método no soportado: ${method}`)
      console.error("   Métodos disponibles: GET | POST | DELETE")
  }
}

//  Llamamos al enrutador
//  Capturamos cualquier ERROR inesperado
main().catch((err) => {
  console.error("💥 Error inesperado:", err.message)
  process.exit(1)
})