# Integração com Backend

## Configuração da API

O frontend busca dados de produtos através da API backend. Por padrão, a URL base é `http://localhost:8080/api`.

Para configurar uma URL diferente, defina a variável de ambiente `API_BASE_URL`:

```bash
# .env ou .env.local
API_BASE_URL=https://api.exemplo.com/api
```

## Endpoints Esperados

### Listar Produtos
```
GET /api/products
```

**Resposta esperada:**
```json
[
  {
    "id": "civic-2022",
    "brand": "Honda",
    "modelName": "Civic Touring",
    "type": "sedan",
    "value": 15990000,
    "status": "disponivel",
    "year": 2022,
    "description": "Sedã médio com ótimo equilíbrio..."
  }
]
```

### Buscar Produto por ID
```
GET /api/products/:id
```

**Resposta esperada:**
```json
{
  "id": "civic-2022",
  "brand": "Honda",
  "modelName": "Civic Touring",
  "type": "sedan",
  "value": 15990000,
  "status": "disponivel",
  "year": 2022,
  "description": "Sedã médio com ótimo equilíbrio..."
}
```

**Resposta 404:**
```json
{
  "message": "Produto não encontrado"
}
```

## Tipos de Veículo (VeiculoType)

Os seguintes tipos são suportados:
- `carro`
- `suv`
- `pickup`
- `esportivo`
- `classico`
- `van`
- `hatch`
- `sedan`

## Status do Produto

- `disponivel`: Produto disponível para compra
- `vendido`: Produto já vendido (não pode ser adicionado ao carrinho)

## Valores Monetários

Todos os valores são armazenados em **centavos** (BRL). Exemplo:
- R$ 159.900,00 = 15990000 centavos

O frontend formata automaticamente para exibição.

## CORS

Se o backend estiver em domínio diferente, certifique-se de que o CORS está configurado para aceitar requisições do domínio do frontend.

## Exemplo de Implementação Backend (Node.js/Express)

```javascript
// Exemplo simplificado
app.get('/api/products', (req, res) => {
  res.json([
    {
      id: 'civic-2022',
      brand: 'Honda',
      modelName: 'Civic Touring',
      type: 'sedan',
      value: 15990000,
      status: 'disponivel',
      year: 2022,
      description: 'Sedã médio completo'
    }
  ]);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }
  res.json(product);
});
```
