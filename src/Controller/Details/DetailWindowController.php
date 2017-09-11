<?php

namespace App\Controller;

class DetailWindowController extends AppController {
    public function index(){
        $this->viewBuilder()->setLayout("inner");
    }
}