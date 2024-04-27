-- criação da tabela dos bruxos --

 CREATE TABLE bruxos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL,
    casa VARCHAR(100) NOT NULL,
    habilidade VARCHAR(100) NOT NULL,
    status_sangue VARCHAR(100) NOT NULL,
    patrono VARCHAR(100)
 );
 -- fim da criação da tabela dos bruxos --


 -- criação da tabela de varinhas --
  CREATE TABLE varinhas (
    id SERIAL PRIMARY KEY,
   material VARCHAR(100) NOT NULL,
   comprimento INT NOT NULL,
   nucleo VARCHAR(100) NOT NULL,
   data_criacao DATE NOT NULL
  );

   -- fim da criação da tabela de varinhas --


-- criação do insert de bruxos --

INSERT INTO bruxos (nome, idade, casa, habilidade, status_sangue, patrono) VALUES ('Hermione Granger', 20, 'Grifinória', 'Feitiços', 'Mestiço', 'Lontra');
INSERT INTO bruxos (nome, idade, casa, habilidade, status_sangue, patrono) VALUES ('Harry Potter', 20, 'Grifinória', 'Feitiços', 'Mestiço', 'Cervo');
INSERT INTO bruxos (nome, idade, casa, habilidade, status_sangue, patrono) VALUES ('Ronald Weasley', 20, 'Grifinória', 'Feitiços', 'Puro', 'Jack Russel Terrier');
 
-- fim do insert de bruxos --

-- criação do insert de varinhas --

INSERT INTO varinhas (material, comprimento, nucleo, data_criacao) VALUES ('Vidro', 30, 'Pena de Fênix', '2020-01-01');
INSERT INTO varinhas (material, comprimento, nucleo, data_criacao) VALUES ('Madeira', 25, 'Pelo de Unicórnio', '2020-01-01');

