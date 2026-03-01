<?php
include './conexao.php';

header('Content-Type: application/json');

try {
    $query = $conn->query("SELECT * FROM musica ORDER BY autor ASC");

    if ($query) {    
        $itens = $query->fetch_all(MYSQLI_ASSOC);
        echo json_encode([
            "status" => "success",
            "data" => $itens
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Erro ao executar a consulta."
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
exit;
?>
