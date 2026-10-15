$(document).ready(function() {
    var selectedDate; // Variável para armazenar a data selecionada
    var occupiedSlots = [];
    var appointments = []; // Array para armazenar os agendamentos

    // Initialize the calendar
    $('#calendar').fullCalendar({
        defaultView: 'month',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        select: function(start, end) {
            // Handle the selected date here
            selectedDate = moment(start).format('YYYY-MM-DD');
        }
    });

$('#bookAppointment').on('click', function() {
    if (!selectedDate) {
        alert('Selecione uma data no calendário.');
        return;
    }

    var clientName = $('#clientName').val().trim();

    if (clientName === '') {
        alert('Digite seu nome para agendar.');
        return;
    }

    var selectedTime = $('#timeslot').val();
    var slot = selectedDate + '|' + selectedTime;

if (occupiedSlots.includes(slot)) {
    alert('Este horário já foi agendado. Escolha outro.');
    return;
}

occupiedSlots.push(slot);
    var appointment = 'Nome: ' + clientName + ' | Data: ' + selectedDate + ' | Hora: ' + selectedTime;

        // Adicione o agendamento ao array de agendamentos
        appointments.push(appointment);

        // Atualize a lista de agendamentos na página
        updateScheduledDates();

        alert('Você agendou: ' + appointment);
    });

    // Função para atualizar a lista de agendamentos
    function updateScheduledDates() {
        var $scheduledDates = $('#scheduledDates');
        $scheduledDates.empty();

        for (var i = 0; i < appointments.length; i++) {
            var $appointmentItem = $('<li>').text(appointments[i]);
            $scheduledDates.append($appointmentItem);
        }
    }
});
