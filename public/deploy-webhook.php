<?php
/**
 * Auto-Deployment Webhook for cPanel & GitHub
 * Automatically pulls and updates code on git push
 */

// Secret security token
$secretToken = 'portfolio_deploy_secret_key_84920482';

$requestToken = $_GET['token'] ?? $_POST['token'] ?? ($_SERVER['HTTP_X_DEPLOY_TOKEN'] ?? '');

if (empty($requestToken) || $requestToken !== $secretToken) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized: Invalid deploy token.']);
    exit;
}

$repoPath   = '/home/engineerjahid/public_htmlrepositories/porftolio-website-laravel---react';
$deployPath = '/home/engineerjahid/public_html';

$log = [];

// 1. Ensure storage directories exist
@mkdir($deployPath . '/storage/framework/cache/data', 0775, true);
@mkdir($deployPath . '/storage/framework/sessions', 0775, true);
@mkdir($deployPath . '/storage/framework/views', 0775, true);
@mkdir($deployPath . '/storage/logs', 0775, true);
@mkdir($deployPath . '/bootstrap/cache', 0775, true);

// 2. Git pull in repository folder
exec("cd {$repoPath} && git pull origin main 2>&1", $log, $ret);

// 3. Sync updated files into public_html
exec("/bin/cp -R {$repoPath}/app {$deployPath}/ 2>&1", $log);
exec("/bin/cp -R {$repoPath}/bootstrap {$deployPath}/ 2>&1", $log);
exec("/bin/cp -R {$repoPath}/config {$deployPath}/ 2>&1", $log);
exec("/bin/cp -R {$repoPath}/database {$deployPath}/ 2>&1", $log);
exec("/bin/cp -R {$repoPath}/public {$deployPath}/ 2>&1", $log);
exec("/bin/cp -R {$repoPath}/resources {$deployPath}/ 2>&1", $log);
exec("/bin/cp -R {$repoPath}/routes {$deployPath}/ 2>&1", $log);
exec("/bin/cp -R {$repoPath}/artisan {$deployPath}/ 2>&1", $log);
exec("/bin/cp {$repoPath}/composer.json {$deployPath}/ 2>&1", $log);
exec("/bin/cp {$repoPath}/composer.lock {$deployPath}/ 2>&1", $log);
exec("/bin/cp {$repoPath}/.htaccess {$deployPath}/ 2>&1", $log);

// 4. Clear Laravel Cache
exec("cd {$deployPath} && php artisan optimize:clear 2>&1", $log);

header('Content-Type: application/json');
echo json_encode([
    'status'    => 'success',
    'timestamp' => date('Y-m-d H:i:s'),
    'output'    => $log
]);
