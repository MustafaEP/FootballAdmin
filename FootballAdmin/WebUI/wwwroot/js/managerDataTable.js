﻿

$(document).ready(function () {
    // DataTable'ı başlat
    var table = $('.dataTables-example').DataTable({
        pageLength: 25,
        responsive: true,
        paging: false,
        ordering: true,
        dom: '<"html5buttons"B>lTfgitp',
        columns: [
            { data: 'name' },
            { data: 'surName' },
            { data: 'email' },
            { data: 'phone' },
            { data: 'country' },
            { data: 'teamName' },
            { data: 'preferredLineUp' }
        ],
        buttons: [
            { extend: 'copy', text: 'Kopyala' },
            { extend: 'csv', text: 'CSV' },
            { extend: 'excel', text: 'Excel', title: 'Oyuncular' },
            { extend: 'pdf', text: 'PDF', title: 'Oyuncular' },
            {
                extend: 'print',
                text: 'Yazdır',
                customize: function (win) {
                    $(win.document.body)
                        .css('font-size', '10px')
                        .css('margin', '2rem')
                        .css('background-color', '#000')
                        .css('color', '#f0f0f0');

                    $(win.document.body).find('table')
                        .addClass('compact buttons-html5')
                        .css('font-size', 'inherit')
                        .css('margin', '2rem')
                        .css('color', '#000000')
                        .css('border-color', '#444');
                }
            },
            {
                text: 'Yeni Menejer',
                className: 'ml-3 btn btn-success',
                action: function (e, dt, node, config) {
                    newManagerFunc();
                }
            }
        ],
        language: {
            sProcessing: "İşleniyor...",
            sLengthMenu: "Göster _MENU_ Oyuncu",
            sZeroRecords: "Menejerler Aranıyor...",
            sInfo: "Gösterilen: _START_ - _END_, Toplam Menejer: _TOTAL_",
            sInfoEmpty: "Gösterilen: 0 - 0, Toplam Meneher: 0",
            sInfoFiltered: "( _MAX_ kayıt içinde bulundu)",
            sSearch: "Ara:",
            oPaginate: {
                sFirst: "İlk",
                sPrevious: "<-",
                sNext: "->",
                sLast: "Son"
            }
        },
        responsive: true
    });

    // AJAX ile verileri yükle
    $.ajax({
        url: '/Admin/Manager/GetManagers',
        method: 'GET',
        success: function (data) {
            table.clear(); // DataTable'daki verileri temizle
            table.rows.add(data); // Yeni verileri ekle
            table.draw(); // DataTable'ı güncelle

        },
        error: function () {
            alert('Veriler alınırken hata oluştu');
        }
    });

    $('.dataTables-example tbody').on('click', 'tr', function () {
        var data = table.row(this).data(); // Tıklanan satırdaki veriyi al

        Swal.fire({
            title: `${data.name} ${data.surName}`,
            html: `<div class="row">
        <div class="col-md-12">
            <h5>Oyuncu Bilgileri</h5>
            <div class="row pb-2 pt-2">
                <div class="col-6"><strong>İsim:</strong></div>
                <div class="col-6">${data.name}</div>
            </div>
            <hr class="border border-white border-2 opacity-25">
            <div class="row pb-2 pt-2">
                <div class="col-6"><strong>Soyisim:</strong></div>
                <div class="col-6">${data.surName}</div>
            </div>
            <hr class="border border-white border-2 opacity-25">
            <div class="row pb-2 pt-2">
                <div class="col-6"><strong>Email:</strong></div>
                <div class="col-6">${data.email}</div>
            </div>
            <hr class="border border-white border-2 opacity-25">
            <div class="row pb-2 pt-2">
                <div class="col-6"><strong>Telefon:</strong></div>
                <div class="col-6">${data.phone}</div>
            </div>
            <hr class="border border-white border-2 opacity-25">
            <div class="row pb-2 pt-2">
                <div class="col-6"><strong>Ülke:</strong></div>
                <div class="col-6">${data.country}</div>
            </div>
            <hr class="border border-white border-2 opacity-25">
            <div class="row pb-2 pt-2">
                <div class="col-6"><strong>Takım:</strong></div>
                <div class="col-6">${data.teamName}</div>
            </div>
            <hr class="border border-white border-2 opacity-25">
            <div class="row pb-2 pt-2">
                <div class="col-6"><strong>Pozisyon:</strong></div>
                <div class="col-6">${data.preferredLineUp}</div>
            </div>
        </div>
    </div>`,
            background: "#111111",
            width: 1000,
            confirmButtonText: 'Güncelle',
            showCancelButton: true,
            cancelButtonText: 'Sil',
            cancelButtonColor: "#d33",
            showDenyButton: true,
            denyButtonText: 'Çık',
            returnInputValueOnDeny: false,
            customClass: {
                denyButton: 'pop-up-button btn-success',
                confirmButton: 'pop-up-button btn-primary',
                cancelButton: 'pop-up-button btn-danger',
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    background: "#111111",
                    icon: "error",
                    text: "Silmek İstediğinizden Emin Misiniz?",
                    showCancelButton: true,
                    confirmButtonText: "Sil",
                    cancelButtonText: "Çık",
                    customClass: {
                        confirmButton: 'pop-up-button btn-danger',
                        cancelButton: 'pop-up-button btn-success'
                    }
                }).then((deleteResult) => {
                    if (deleteResult.isConfirmed) {
                        $.ajax({
                            url: '/Admin/Manager/DeleteManager/' + data.id,
                            type: 'POST',
                            success: function (response) {
                                if (response.success) {
                                    //Table Yenilenecek.

                                    Swal.fire({
                                        background: "#111111",
                                        icon: "success",
                                        title: "Silme İşlemi Başarılı",
                                    });
                                }
                                else {
                                    Swal.fire({
                                        background: "#111111",
                                        icon: "error",
                                        title: "Silme İşlemi Gerçekleştirilemedi"
                                    });
                                }

                            },
                            error: function () {
                                Swal.fire({
                                    background: "#111111",
                                    icon: "error",
                                    title: "Sistemsel Bir Hata Oluştu",
                                });
                            }
                        });
                    }
                    else if (deleteResult.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                            background: "#111111",
                            icon: "success",
                            title: "İşlem İptal Edildi",
                            showConfirmButton: false,
                            timer: 1000
                        });
                    }
                });
            }
            else if (result.isDenied) {
                Swal.fire({
                    background: "#111111",
                    icon: "success",
                    title: "İşlem İptal Edildi",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
            else if (result.isConfirmed) {
                Swal.fire({
                    background: "#111111",
                    icon: "null",
                    width: 1000,
                    title: "Güncelleme Sayfası",
                    showConfirmButton: true,
                    confirmButtonText: "Güncelle",
                    html: `<div class="card">
                            <div class="card-body">
                                <form class="forms-sample" id="updateForm">
                                    <div class="form-group">
                                        <label for="name" style="color: #fff;">Ad:</label>
                                        <input type="text" id="name" class="form-control" placeholder="Ad" value="${data.name}" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="surname" style="color: #fff;">Soyad:</label>
                                        <input type="text" id="surname" class="form-control" placeholder="Soyad" value="${data.surName}" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="email" style="color: #fff;">Email:</label>
                                        <input type="email" id="email" class="form-control" placeholder="Email" value="${data.email}" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="phone" style="color: #fff;">Telefon:</label>
                                        <input type="text" id="phone" class="form-control" placeholder="Telefon" value="${data.phone}" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="country" style="color: #fff;">Ülke:</label>
                                        <input type="text" id="country" class="form-control" placeholder="Ülke" value="${data.country}" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="teamid" style="color: #fff;">Takım Id:</label>
                                        <input type="text" id="teamid" class="form-control" placeholder="Takım Id" value="${data.teamId}" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="preferredLineUp" style="color: #fff;">Favori Diziliş:</label>
                                        <input type="text" id="preferredLineUp" class="form-control" placeholder="Favori Diziliş" value="${data.preferredLineUp}" required>
                                    </div>
                                </form>
                            </div>
                        </div>`,
                    preConfirm: () => {
                        const updatedData = {
                            id: data.id,
                            name: document.getElementById('name').value,
                            surname: document.getElementById('surname').value,
                            email: document.getElementById('email').value,
                            phone: document.getElementById('phone').value,
                            country: document.getElementById('country').value,
                            preferredLineUp: document.getElementById('preferredLineUp').value,
                            teamId: document.getElementById('teamid').value
                        };

                        if (Object.values(updatedData).some(field => !field)) {
                            Swal.showValidationMessage("Lütfen tüm alanları doldurun.");
                        } else {
                            console.log("updatedData");
                            return updatedData;
                        }
                    }
                }).then((result) => {
                    console.log("result");

                    if (result.isConfirmed) {
                        console.log("confirmed");
                        const updatedData = result.value;
                        $.ajax({
                            url: '/Admin/Manager/UpdateManager/',
                            data: JSON.stringify(updatedData),
                            contentType: "application/json; charset=utf-8",
                            type: 'POST',
                            success: function (response) {
                                if (response.success) {
                                    // Tabloyu güncelleme
                                    updateTableRow(updatedData);
                                    swalInfo.fire({
                                        background: "#111111",
                                        icon: "success",
                                        title: "Güncelleme İşlemi Başarılı",
                                    });
                                    becareful();
                                }
                                else {
                                    swalInfo.fire({
                                        background: "#111111",
                                        icon: "error",
                                        title: "Güncelleme İşlemi Gerçekleştirilemedi",
                                    });
                                }
                            },
                            error: function () {
                                swalInfo.fire({
                                    background: "#111111",
                                    icon: "error",
                                    title: "Sistemsel Bir Hata Oluştu",
                                });
                            }
                        });
                    }
                })
            }
        });
    });
});
