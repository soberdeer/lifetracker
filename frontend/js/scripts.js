$().ready(function () {
    $('.datetimepicker').datetimepicker({
        format: 'YYYY-MM-DD'
    });
});

function weightScripts() {
    $().ready(function () {
        // build table
        diff = 0;
        weightBuff = chartData[0][2];
        $.each(chartData, function (index, value) {
            diff = value[2] - weightBuff;
            $('#weight-table').append(
                '<tr><td>' + value[1] + '</td><td>' + value[2] + '</td><td><a href="#" data-weight-id=' + value[0] + ' class="remove-weight-btn"><span class="glyphicon glyphicon-trash"></span></a></td><td>' + diff + '</td></tr>'
            );
            weightBuff = value[2];
        });

        var $dataTable = $('#weight_table').DataTable({
            "sDom": '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',
            searching: false,
            lengthChange: false,
            info: false
        });

        // refresh table to reflect new data
        $dataTable.draw();

        // remove data entrance
        $('#weight_table').on('click', '.remove-weight-btn', function (e) {
            e.preventDefault();
            // weigh tmodel id
            var weightId = $(this).data('weightId');
            var $row = $(this).parents('tr');
            $.ajax({
                // REST interaction
                headers: {"X-CSRFToken": $.cookie('csrftoken')},
                type: "DELETE",
                //dataType: "jsonp",
                url: '/api/weight/' + weightId + '/',
                success: function (data) {
                    // remove table row
                    $row.stop(true, true).fadeOut(function () {
                        $dataTable.row($row).remove().draw();
                    });
                    // update graph
                    for (var i = 0; i < chartData.length; i++) {
                        if (chartData[i][0] == weightId) {
                            chartData.splice(i, 1);
                            graphData.labels.splice(i, 1);
                            graphData.weightData.splice(i, 1);
                            myChart.update();
                            break;
                        }
                    }
                }
            });
        });
    });
    $('#add_weight_btn').on('click', function (e) {
        e.preventDefault();
        var date = $('#weight_date').val();
        var weight = $('#weight_value').val();
        if(!date || !weight) {
            alert('Please provide weighting date and value.');
            return false
        }
        if (new Date(date) == 'Invalid Date') {
	        alert('Wrong date provided.');
            return false
        }
        if(isNaN(weight)) {
            alert('Please provide proper weight value (ex.: 100, 99.9)');
            return false
        }
        $.ajax({
            headers: {"X-CSRFToken": $.cookie('csrftoken')},
            type: "POST",
            url: '/api/weight/',
            data: {
                value: weight,
                weight_date_time: date + 'T00:00:00+00:00'
            }
        })
    })
}

function mealAdd() {
    $("#submit-button-add-meal").on('click', function (event) {
        event.preventDefault();
        /* get the action attribute from the <form action=""> element */
        var name = $('#name').val();
        var type = (0);
        var calories = $('#calorie').val();
        var protein = $('#protein').val();
        var fat = $('#fat').val();
        var carbs = $('#carbs').val();
        $.ajax({
            headers: {"X-CSRFToken": $.cookie('csrftoken')},
            type: "POST",
            url: '/api/meals/',
            data: ''
        })
            .done(function (data) {
                alert('success');
            });

        $('#mealModal').modal('hide');
        return false;

    });
}