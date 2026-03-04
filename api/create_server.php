<?php
// Pengaturan API Pterodactyl
$ptero_url = "https://panel.anda.com";
$ptero_api_key = "ptla_xxxxxxxxxxxxxxxx"; // Ganti dengan Application API Key

header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'];

// 1. Logic Cari atau Buat User di Panel
// (Script ini disingkat, intinya melakukan POST ke /api/application/users)

// 2. Logic Buat Server Otomatis
$data_server = [
    "name" => "Server-" . rand(100, 999),
    "user" => 1, // Anda harus ambil ID user dari tahap 1
    "egg" => 15,
    "docker_image" => "quay.io/pterodactyl/core:java-17",
    "startup" => "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
    "limits" => [
        "memory" => 1024,
        "swap" => 0,
        "disk" => 5120,
        "io" => 500,
        "cpu" => 100
    ],
    "deploy" => ["locations" => [1], "dedicated_ip" => false, "port_range" => []]
];

$ch = curl_init($ptero_url . "/api/application/servers");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $ptero_api_key",
    "Content-Type: application/json",
    "Accept: Application/vnd.pterodactyl.v1+json"
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data_server));

$response = curl_exec($ch);
curl_close($ch);

echo json_encode(['success' => true, 'message' => 'Server Created']);
?>
