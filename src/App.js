import { Box } from "@mui/material";
import CardProduto from "./components/CardProduto";
import Header from "./components/Header";
import ResumoCard from "./components/ResumoCard";
import { useState, useEffect } from "react";
import ListaProdutosCard from "./components/ListaProdutosCard";
import Footer from "./components/Footer";


function App() {
  const BASE_URL = 'https://product-price-back.vercel.app';
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${BASE_URL}/products`);
      const data = await res.json();
      setProdutos(data);
    }
    load();
  }, []);

  async function adicionarProduto(produto) {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });

    const novo = await res.json();
    setProdutos((prev) => [...prev, novo]);
  }

  async function editarProduto(id, updates) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    const atualizado = await res.json();
    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? atualizado : p))
    );
  }

  async function deletarProduto(id) {
    await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });

    setProdutos((prev) => prev.filter((p) => p.id !== id));
  }

  const totalProdutos = produtos.length;
  const totalItens = produtos.reduce((acc, p) => acc + Number(p.quantidade), 0);
  const valorTotal = produtos.reduce(
    (acc, p) => acc + Number(p.preco) * Number(p.quantidade),
    0
  );

  return (
    <>
      <Box sx={{ minHeight: "110vh", backgroundColor: "#eff6ff" }}>
        
        <Box
          sx={{
            display: "flex",
            gap: 3,
            padding: 2,
            flexDirection: {
              xs: "column",
              md: "row",   
            },
          }}
        >

        
          <Box
            sx={{
              width: {
                xs: "100%", 
                md: "35%",  
              },
            }}
          >
            <Header />
            <CardProduto onAdd={adicionarProduto} />
            <ResumoCard
              produtos={totalProdutos}
              itens={totalItens}
              valor={valorTotal}
            />
          </Box>

         
          <Box
            sx={{
              width: {
                xs: "100%",  
                md: "65%",   
              },
            }}
          >
            <ListaProdutosCard
              produtos={produtos}
              onUpdate={(id, campo, valor) =>
                editarProduto(id, { [campo]: Number(valor) })
              }
              onRemove={deletarProduto}
            />
          </Box>

        </Box>

        <Footer />
      </Box>
    </>
  );
}

export default App;
