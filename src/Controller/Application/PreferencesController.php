<?php

namespace App\Controller\Application;

use App\Controller\AppController;

class PreferencesController extends AppController {
    public function index(){
        $this->viewBuilder()->setLayout("inner");
    }
}