import React, { useState, useEffect } from "react";

function App() {
  const [gato, setGato] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const buscarGato = async () => {
    try {
      setCarregando(true);
      setErro(null);

      const resposta = await fetch("https://api.thecatapi.com/v1/images/search");
      if (!resposta.ok) {
        throw new Error("Erro ao buscar imagem 😿");
      }

      const dados = await resposta.json();
      setGato(dados[0]);
    } catch (erro) {
      setErro("Não foi possível carregar a imagem. Tente novamente!");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarGato();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🐾 Imagens Aleatórias de Gatos 🐾</h1>

      {carregando && <p>Carregando...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {gato && (
        <div>
          <img
            src={gato.url}
            alt="Gato fofo"
            width={gato.width / 4}
            height={gato.height / 4}
            style={{ borderRadius: "15px", marginTop: "20px" }}
          />
        </div>
      )}

      <button
        onClick={buscarGato}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          backgroundColor: "#6c63ff",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Próxima imagem 🐱
      </button>
    </div>
  );
}

export default App;
