<?php
include './conexao.php';

header('Content-Type: application/json');

try {
    // Executa a consulta SQL
    $query = $conn->query("SELECT * FROM musica ORDER BY autor ASC");

    // Verifica se houve resultados
    if ($query) {
        // Transforma os resultados em um array associativo
        $itens = $query->fetch_all(MYSQLI_ASSOC); // Método correto para MySQLi

        // Retorna os dados como JSON
        echo json_encode([
            "status" => "success",
            "data" => $itens
        ]);
    } else {
        // Caso a consulta falhe
        echo json_encode([
            "status" => "error",
            "message" => "Erro ao executar a consulta."
        ]);
    }
} catch (Exception $e) {
    // Trata erros e retorna uma mensagem JSON
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
exit;
?>
