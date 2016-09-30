jQuery(document).ready(function($) {
	if(!$('body').hasClass('widgets_access')){
		ucwSetupList($);
		$('.uams-contact-edit-item').addClass('toggled-off');
		ucwSetupHandlers($);
	}

	$(document).ajaxSuccess(function() {
		ucwSetupList($);
		$('.uams-contact-edit-item').addClass('toggled-off');
	});
});

function ucwSetupList($){
	$( ".uams-contact-list" ).sortable({
		items: '.list-item',
		opacity: 0.6,
		cursor: 'n-resize',
		axis: 'y',
		handle: '.moving-handle',
		placeholder: 'sortable-placeholder',
		start: function (event, ui) {
			ui.placeholder.height(ui.helper.height());
		},
		update: function() {
			//var changedList = this.id;
			var neworder = $(this).sortable('toArray');
			updateOrder($(this), neworder);
		}
	});

	$( ".uams-contact-list .moving-handle" ).disableSelection();
}


// All Event handlers
function ucwSetupHandlers($){
	$("body").on('click.ucw','.uams-contact-delete',function() {
		$(this).parent().parent().fadeOut(500,function(){
			var ucw = $(this).parents(".widget-content");
			$(this).remove();
			ucw.find('.order').val(ucw.find('.uams-contact-list').sortable('toArray'));
			var num = ucw.find(".uams-contact-list .list-item").length;
			var amount = ucw.find(".amount");
			amount.val(num);

		});
	});

	$("body").on('click.ucw','.uams-contact-add',function() {
		var ucw = $(this).parent().parent();
		var num = ucw.find('.uams-contact-list .list-item').length + 1;

		ucw.find('.amount').val(num);

		var item = ucw.find('.uams-contact-list .list-item:last-child').clone();
		var item_id = item.attr('id');
		item.attr('id',increment_last_num(item_id));

		$('.toggled-off',item).removeClass('toggled-off');
		$('.number',item).html(num);
		$('.person-title',item).html('');

		$('label',item).each(function() {
			var for_val = $(this).attr('for');
			$(this).attr('for',increment_last_num(for_val));
		});

		$('input',item).each(function() {
			var id_val = $(this).attr('id');
			var name_val = $(this).attr('name');
			$(this).attr('id',increment_last_num(id_val));
			$(this).attr('name',increment_last_num(name_val));
			if($(':checked',this)){
			   $(this).removeAttr('checked');
			}
			$(this).val('');
		});

		ucw.find('.uams-contact-list').append(item);
		ucw.find('.order').val(ucw.find('.uams-contact-list').sortable('toArray'));
	});

	$('body').on('click.ucw','.moving-handle', function() {
		$(this).parent().find('.uams-contact-edit-item').slideToggle(200);
	} );
}

function increment_last_num(v) {
    return v.replace(/[0-9]+(?!.*[0-9])/, function(match) {
        return parseInt(match, 10)+1;
    });
}

function updateOrder(self, neworder){
	var ucw = self.parents(".widget-content");
	ucw.find('.order').val(neworder);
}

