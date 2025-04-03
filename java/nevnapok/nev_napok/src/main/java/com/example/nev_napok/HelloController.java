package com.example.nev_napok;

import javafx.fxml.FXML;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import javafx.stage.FileChooser;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class HelloController {

    @FXML private ComboBox<String> cmHonapok;
    @FXML private ListView<String> lsLista;


    private FileChooser fc = new FileChooser();

    String[] honapok = {"Jan", "Feb", "Marc", "Apr", "Maj", "Jun", "Jul", "Aug", "Szept", "Okt", "Nov", "Dec"};

    private class Nev {
        public String nev;
        public ArrayList<String> napok;

        public Nev(String sor){
            String[] s = sor.split(";");
            nev = s[0];
            napok = new ArrayList<>();
            for(int i = 1; i < s.length; i++) napok.add(s[i]);
        }
    }

    private ArrayList<Nev> nevek = new ArrayList<>();

    public void initialize(){
        for(String honev : honapok) cmHonapok.getItems().add(honev);
        cmHonapok.getSelectionModel().select(0);
        fc.setInitialDirectory(new File("./"));
        fc.getExtensionFilters().add(new FileChooser.ExtensionFilter("CSV fájlok", "*.csv"));
    }

    @FXML private void onMegnyitasKlikk() {
        File fbe = fc.showOpenDialog(cmHonapok.getScene().getWindow());
        if(fbe != null){
            betolt(fbe);
            lsLista.getItems().add(nevek.get(9).nev)
        }

    }

    private void betolt(File fajl){
        Scanner be = null;
        try {
            be = new Scanner(fajl, "utf-8");
            while(be.hasNextLine()) nevek.add(new Nev(be.nextLine()));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } finally{
            if(be!=null){
                be.close();
            }
        }

    }


}