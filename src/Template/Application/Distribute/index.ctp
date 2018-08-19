<?php
use Cake\Core\Configure;

if (Configure::read('debug')) {
    sleep(rand(1, 4));
}

echo $this->Html->css("application/distribute/index", ["block" => "css"]);

echo $this->Html->script("Application/Distribute/DistributeController", ["block" => "script"]);

?>
<div ng-controller="applicationDistributeController">
    ThisIsAVeryLongWordThatShouldWrapWithoutAnyHorizontalScrollingThisIsAVeryLongWordThatShouldWrapWithoutAnyHorizontalScrollingThisIsAVeryLongWordThatShouldWrapWithoutAnyHorizontalScrollingThisIsAVeryLongWordThatShouldWrapWithoutAnyHorizontalScrollingThisIsAVeryLongWordThatShouldWrapWithoutAnyHorizontalScrollingThisIsAVeryLongWordThatShouldWrapWithoutAnyHorizontalScrollingThisIsAVeryLongWordThatShouldWrapWithoutAnyHorizontalScrollingThisIsAVeryLongWordThatShouldWrapWithoutAnyHorizontalScrollingThisIsAVeryLongWordThatShouldWrapWithoutAnyHorizontalScrollingThisIsAVeryLongWordThatShouldWrapWithoutAnyHorizontalScrollingThisIsAVeryLongWordThatShouldWrapWithoutAnyHorizontalScrollingThisIsAVeryLongWordThatShouldWrapWithoutAnyHorizontalScrolling
    <div ng-repeat="a in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]">
        Distribute View {{a}} Distribute View {{a}} One Two Three Distribute View {{a}} One Distribute View {{a}} Two Three Distribute View {{a}} One Two Three Distribute View {{a}} Distribute View {{a}} Distribute View {{a}}
    </div>
</div>
