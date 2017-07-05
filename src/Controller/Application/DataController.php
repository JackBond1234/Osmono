<?php

namespace App\Controller\Application;

use App\Controller\AppController;

class DataController extends AppController {
    public function index(){
        $this->viewBuilder()->setLayout("inner");
    }
}