module com.example.nev_napok {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.nev_napok to javafx.fxml;
    exports com.example.nev_napok;
}