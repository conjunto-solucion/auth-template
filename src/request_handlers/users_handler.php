<?php

require_once __DIR__."/../types/user.php";


function handle_post_on_users() {
    require_once __DIR__."/../database_services/insert_user.php";
    require_once __DIR__."/../database_services/sign_in.php";

    $data = json_decode(REQUEST_BODY);
    $user = new User($data->username, $data->email, $data->password);

    validate_user($user);
    insert_user($user);

    $session = sign_in($user->email, $user->password);
    http_exit_with_json(HTTP_CREATED, json_encode($session));
}



switch (REQUEST_METHOD) {

    case 'POST': handle_post_on_users(); break;

    default: http_exit(HTTP_NOT_FOUND);
}