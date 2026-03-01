<?php
include './conexao.php';

header('Content-Type: application/json');

$response = [];

function salvarArquivo($file, $pasta, $extensoesPermitidas) {
    if ($file['error']) {
        return ["error" => "Erro ao salvar o arquivo"];
    }

    $nome = $file['name'];
    $extension = strtolower(pathinfo($nome, PATHINFO_EXTENSION));
    if (!in_array($extension, $extensoesPermitidas)) {
        return ["error" => "Extensão não permitida. Permitidos: " . implode(", ", $extensoesPermitidas)];
    }

    $novoNome = uniqid() . "." . $extension;
    $caminhoCompleto = $pasta . "/" . $novoNome;
    if (!move_uploaded_file($file["tmp_name"], $caminhoCompleto)) {
        return ["error" => "Falha ao mover o arquivo"];
    }

    return ["path" => $caminhoCompleto];
}

if (isset($_POST['input_music']) && isset($_POST['input_autor'])) {
    $name = $_POST['input_music'];
    $autor = $_POST['input_autor'];

    $pasta = __DIR__ . '/arquivos/' . $name;
    if (!mkdir($pasta, 0777, true) && !is_dir($pasta)) {
        $response = ["status" => "error", "message" => "Erro ao criar pasta"];
        echo json_encode($response);
        exit;
    }

    $pathImg = null;
    $pathMusic = null;

    if (isset($_FILES['input_img'])) {
        $resultadoImg = salvarArquivo($_FILES['input_img'], $pasta, ["jpg", "png"]);
        if (isset($resultadoImg['error'])) {
            $response = ["status" => "error", "message" => $resultadoImg['error']];
            echo json_encode($response);
            exit;
        }
        $pathImg = $resultadoImg['path'];
    }

    if (isset($_FILES['music_url'])) {
        $resultadoMusic = salvarArquivo($_FILES['music_url'], $pasta, ["mp3"]);
        if (isset($resultadoMusic['error'])) {
            $response = ["status" => "error", "message" => $resultadoMusic['error']];
            echo json_encode($response);
            exit;
        }
        $pathMusic = $resultadoMusic['path'];
    }

    $stmt = $conn->prepare("INSERT INTO musica (nome, autor, img, link) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $autor, $pathImg, $pathMusic);
    $stmt->execute();
    $stmt->close();

    $response = ["status" => "success", "message" => "Música salva com sucesso!"];
} else {
    $response = ["status" => "error", "message" => "Dados inválidos"];
}

echo json_encode($response);
