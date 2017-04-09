<h1>Test Page</h1>

<table>
    <? foreach ($testvar as $var): ?>
    <tr>
        <td>
            <?= $var->userid ?>
        </td>
        <td>
            <?= $var->username ?>
        </td>
    </tr>
    <? endforeach; ?>
</table>