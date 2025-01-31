<?php

/* require_once __DIR__."/../models/Session.php";


switch (REQUEST_METHOD) {

    case 'POST': users_post(); break;
        require_once __DIR__."/../validators/validate_user.php";
        require_once __DIR__."/../services/insert_user.php";
        require_once __DIR__."/../services/get_session.php";

        User $user = json_decode(REQUEST_BODY);

        validate_user($user);
        insert_user($user);

        $session = get_session($user->username, $user->password);
        http_exit_with_json(HTTP_CREATED, json_encode($session));
        break;


    default:
        http_exit(HTTP_NOT_FOUND)
}

function users_post() {
    
} */