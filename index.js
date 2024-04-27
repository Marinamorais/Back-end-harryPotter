const express = require('express');
const { Pool } = require('pg'); // Importe Pool do pacote 'pg'

const app = express();
const PORT = 3000;

// Conexão com o banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'aula_harrypotter',
    password: 'senai564',
    port: 5432,
});

app.use(express.json());

// Rota para pegar por id bruxos

app.get("/bruxos", async (req, res) => {
    try {
      const { rows } = await pool.query("SELECT * FROM bruxos");
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar bruxos" });
    }
  });

// Rota para pegar por id bruxos
  app.get("/bruxos/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const { rows } = await pool.query("SELECT * FROM bruxos WHERE id = $1", [
        id,
      ]);
      res.json(
        rows.length > 0
          ? { message: "Bruxo encontrado!", rows }
          : { message: "Bruxo não encontrado" }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar o bruxo" });
    }
  });

// Rota para criar um bruxo
app.post("/bruxos", async (req, res) => {
    const { nome, idade, casa, habilidade, status_sangue, patrono } = req.body;
  
    try {
        const casaValidada = verificaHouse(casa);
        const statusSangueValidado = verificaBloodStatus(status_sangue);

        const result = await pool.query(
            'INSERT INTO bruxos (nome, idade, casa, habilidade, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [nome, idade, casaValidada, habilidade, statusSangueValidado, patrono]
        );
  
        res.status(201).json({
            message: 'Bruxo inserido com sucesso',
            bruxo: result.rows[0],
        });
    } catch (err) {
        console.error('Erro ao inserir novo bruxo:', err);
        res.status(500).send('Erro ao inserir novo bruxo');
    }
});

// Rota para atualizar um bruxo
app.put("/bruxos/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, idade, casa, habilidade, status_sangue, patrono } = req.body;
  
    try {
        const casaValidada = verificaHouse(casa);
        const statusSangueValidado = verificaBloodStatus(status_sangue);

        const result = await pool.query(
            'UPDATE bruxos SET nome = $1, idade = $2, casa = $3, habilidade = $4, status_sangue = $5, patrono = $6 WHERE id = $7 RETURNING *',
            [nome, idade, casaValidada, habilidade, statusSangueValidado, patrono, id]
        );
  
        res.json({
            message: 'Bruxo atualizado com sucesso',
            bruxo: result.rows[0],
        });
    } catch (err) {
        console.error('Erro ao atualizar o bruxo:', err);
        res.status(500).send('Erro ao atualizar o bruxo');
    }

});

// Rota para deletar um bruxo
app.delete( "/bruxos/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
        const result = await pool.query('DELETE FROM bruxos WHERE id = $1', [id]);
  
        res.json({ message: 'Bruxo deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar o bruxo:', err);
        res.status(500).send('Erro ao deletar o bruxo');
    }
  });


const verificaHouse = (house) => {
    const houses = ["Grifinória", "Sonserina", "Corvinal", "Lufa-Lufa"];
    if (houses.includes(house)) {
        return house;
    } else {
        return "Desconhecido"; 
    }
};

const verificaBloodStatus = (bloodStatus) => {
    const validBloodStatus = ["Mestiço", "Puro", "Trouxa"];
    if (validBloodStatus.includes(bloodStatus)) {
        return bloodStatus;
    } else {
        return "Desconhecido"; 
    }
};
// fim das rotas dos bruxos


// começo das rotas das varinhas 

// Rota para pegar por id varinhas

app.get("/varinhas", async (req, res) => {
    try {
      const { rows } = await pool.query("SELECT * FROM varinhas");
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar varinhas" });
    }
  });

// Rota para pegar por id varinhas
app.get("/varinhas/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const { rows } = await pool.query("SELECT * FROM varinhas WHERE id = $1", [
        id,
      ]);
      res.json(
        rows.length > 0
          ? { message: "Varinha Encontrada!", rows }
          : { message: "Varinhas não encontrado" }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar varinhas" });
    }
  });

// Rota para criar uma varinha
app.post("/varinhas", async (req, res) => {
    const { material, comprimento, nucleo, data_criacao } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO varinhas (material, comprimento, nucleo, data_criacao) VALUES ($1, $2, $3, $4) RETURNING *',
            [material, comprimento, nucleo, data_criacao]
        );

        res.status(201).json({
            message: 'Varinha inserida com sucesso',
            varinha: result.rows[0],
        });
    } catch (err) {
        console.error('Erro ao inserir nova varinha:', err);
        res.status(500).send('Erro ao inserir nova varinha');
    }
});

// Rota para atualizar uma varinha

app.put("/varinhas/:id", async (req, res) => {
    const { id } = req.params;
    const { material, comprimento, nucleo, data_criacao } = req.body;

    try {
        const result = await pool.query(
            'UPDATE varinhas SET material = $1, comprimento = $2, nucleo = $3, data_criacao = $4 WHERE id = $5 RETURNING *',
            [material, comprimento, nucleo, data_criacao, id]
        );

        res.json({
            message: 'Varinha atualizada com sucesso',
            varinha: result.rows[0],
        });
    } catch (err) {
        console.error('Erro ao atualizar a varinha:', err);
        res.status(500).send('Erro ao atualizar a varinha');
    }
});

// Rota para deletar uma varinha
app.delete("/varinhas/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM varinhas WHERE id = $1', [id]);

        res.json({ message: 'Varinha deletada com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar a varinha:', err);
        res.status(500).send('Erro ao deletar a varinha');
    }
});

// Rota de teste
app.get('/', (req, res) => {
    res.send('A rota está funcionando perfeitamente!');
});

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Server rodando perfeitamente na porta ${PORT}`);
});