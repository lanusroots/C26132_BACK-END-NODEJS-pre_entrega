const BASE_URL = "https://fakestoreapi.com"

const [, , method, resource, ...rest] = process.argv

async function getAllProducts() {
  const res = await fetch(`${BASE_URL}/products`)
  const products = await res.json()

  console.log(`\n Total de productos: ${products.length}\n`)
  products.forEach(({ id, title, price, category }) => {
    console.log(`  [${id}] ${title}`)
    console.log(`       ${price}  |   ${category}\n`)
  })
}

getAllProducts()