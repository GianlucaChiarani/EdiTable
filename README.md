# EdiTable
A simple and lightweight jQuery plugin to make table cells editable.

Main features:
- works with any html element that contains a value to be updated, such as a table cell;
- sends the updated value to an endpoint;
- supports select and all types of input;
- can get options from an endpoint.

## Installation
```
<link rel="stylesheet" href="css/EdiTable.css" />
<script type="text/javascript" src="js/EdiTable.js"></script>

<!-- if you enable the save button, you need the fontawersome library -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.0/css/all.min.css" />
```
## Basic usage
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
```
<table id="myTable">
	<tbody>
		<tr>
			<td class="editable" data-id="1" data-field="first_name" data-table="actors" data-type="text">Leonardo</td>
			<td class="editable" data-id="1" data-field="last_name" data-table="actors" data-type="text">Di Caprio</td>
			<td class="editable" data-id="1" data-field="film" data-table="actors" data-type="select">Titanic</td>
		</tr>
		<tr>
			<td class="editable" data-id="2" data-field="first_name" data-table="actors" data-type="text">Brad</td>
			<td class="editable" data-id="2" data-field="last_name" data-table="actors" data-type="text">Pitt</td>
			<td class="editable" data-id="2" data-field="film" data-table="actors" data-type="select">Fight Club</td>
		</tr>
	</tbody>
</table>
```
## Options
| Name  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| type  | `string`  | `text` | type of input to show |
| options  | `object`  | `{}` | select options or parameters to fetch options from an endpoint |
| value  | `object`  | `{}` | Endpoint parameters to get the initial value |
| save  | `object`  | `{}` | save endpoint parameters |
| saveBtn  | `bool`  | `false` | shows the save button |
| saveOnEnter  | `bool`  | `true` | enables saving with the enter key |
| saveOnClick  | `bool`  | `true` | enables saving with the click out of the input |
