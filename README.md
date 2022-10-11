# EdiTable
A simple and lightweight jQuery plugin to make table cells editable.
## Installation
```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.0/css/all.min.css" />
<link rel="stylesheet" href="css/EdiTable.css" />

<script type="text/javascript" src="js/EdiTable.js"></script>
```
## Example
JS:
```
$('#myTable td.editable').each(function () {
	$(this).dblclick(function () {
      var cell = $(this);
			cell.ediTable({
        type: cell.attr('data-type'),
        save: {
          endpoint: '/updateRow.php',
          data: {
            id: cell.attr('data-id'),
            field: cell.attr('data-field'),
            table: cell.attr('data-table')
          }
        },
        value: {
          endpoint: 'getValue.php',
          data: {
            id: cell.attr('data-id'),
            field: cell.attr('data-field'),
            table: cell.attr('data-table')
          }
        },
        options: {
          endpoint: '/getOptions.php',
          data: {
            field: cell.attr('data-field'),
            table: cell.attr('data-table')
          }
			  }
		});
	});
});
```
HTML:
```
<table id="myTable">
  <tbody>
		<tr>
			<td>actor</td>
			<td class="editable">Leonardo</td>
			<td class="editable">Di Caprio</td>
		</tr>
		<tr>
			<td>actor</td>
			<td class="editable">Brad</td>
			<td class="editable">Pitt</td>
		</tr>
  </tbody>
</table>
```
## Options
| Name  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| type  | `string`  | `text` |  |
| options  | `object`  | `{}` |  |
| value  | `object`  | `{}` | |
| save  | `object`  | `{}` | |
| saveBtn  | `bool`  | `true` | |
| saveOnEnter  | `bool`  | `true` | |
| saveOnClick  | `bool`  | `false` | |
