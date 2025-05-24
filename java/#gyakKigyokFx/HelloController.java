package com.example.kigyok_fx;

import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.ListView;
import javafx.scene.control.TextField;
import javafx.stage.FileChooser;

import java.io.File;
import java.io.FileNotFoundException;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.TreeSet;


public class HelloController {
    private FileChooser fc =new FileChooser();

    private class Kigyo {
        String faj;
        int hossz;
        String elofordulas;
        String merges;

        public Kigyo(String sor){
            String[] s = sor.split(";");
            faj = s[0];
            hossz = Integer.parseInt(s[1]);
            elofordulas = s[2];
            merges = s[3];
        }
    }

    ArrayList<Kigyo> kigyok = new ArrayList<>();

    @FXML private Button szures;
    @FXML private ListView<String> kigyokList;
    @FXML private ListView<String> szurtKigyokList;
    @FXML private TextField searchField;

    private void betolt(String fajlnev) {
        try(Scanner be =new Scanner(new File(fajlnev))) {
            be.nextLine();
            while (be.hasNextLine()) {
                kigyok.add(new Kigyo(be.nextLine()));
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    public void initialize(){
        fc.setInitialDirectory(new File("./"));
        fc.getExtensionFilters().add(new FileChooser.ExtensionFilter("csv filok","*.csv"));
    }

    @FXML private void fileMegnyit() {
        File fbe = fc.showOpenDialog(szures.getScene().getWindow());
        if (fbe != null) {
            kigyok.clear();
            kigyokList.getItems().clear();
            betolt(fbe.toPath().toString());
           for (Kigyo kigyo:kigyok){
               kigyokList.getItems().add(String.format("%s (%s) %s",kigyo.faj,kigyo.hossz,kigyo.elofordulas));
           }

        }
    }

    @FXML private void onSzuresClick(){
        String searchText=searchField.getText();
        szurtKigyokList.getItems().clear();
        for (Kigyo kigyo:kigyok){
            if (searchField.getText()!=null&&kigyo.faj.toLowerCase().contains(searchText.toLowerCase())){
                szurtKigyokList.getItems().add(kigyo.faj);
            }
        }
    }

    @FXML private void  onKilepesClick(){
        Platform.exit();
    }

    @FXML private void onNevjegyClick(){
        Alert info = new Alert(Alert.AlertType.INFORMATION, "Kigyok v.1.0.0\n(C) Kandó");
        info.setTitle("Névjegy");
        info.setHeaderText(null);
        info.showAndWait();
    }


}