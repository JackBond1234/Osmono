<?php
sleep(2);
    echo $this->Html->script("Application/Controller.js");
?>

<div ng-controller="applicationController" style="background-color:#FF0000; min-height: 100vh">
    <div>
        Menu bar
    </div>
    <div style="background-color:#FFFFFF; position:absolute; padding: 10px; left: 4px; right: 4px; bottom: 4px; top: 44px; border-radius:4px; overflow-y:scroll">

        <div ng-repeat="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
            Application View <br>
            This is the application view<br>
            This view will display a number<br>
            of different applications such as <br>
            a data view for viewing charts related <br>
            to a user's budget usage, <br>
            and a distribution view <br>
            for previewing how money will be <br>
            distributed to each category.
        </div>
    </div>
</div>