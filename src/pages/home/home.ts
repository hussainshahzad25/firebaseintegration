import { Component } from '@angular/core';
import { NavController,AlertController,ActionSheetController } from 'ionic-angular';
//import { AngularFireModule } from 'angularfire2';
import { AngularFire,FirebaseListObservable,AngularFireModule } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  songs: FirebaseListObservable<any>;
  
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    af: AngularFire,afm:AngularFireModule,public actionSheetCtrl: ActionSheetController) {
    this.songs = af.database.list('/songs');
    
    
  }
  // DATA added in shahzad@canbrad Id
  addSong(){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter a name for this new song you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.songs.push({
              title: data.title
            });           
          }
        }
      ]
    });
    prompt.present();
  };

  removeSong(songId: string){
    this.songs.remove(songId);
  };

  showOptions(songId, songTitle) {
   
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Song',
          role: 'destructive',
          cssClass: 'delete',
          handler: () => {
            this.removeSong(songId);
          }
        },{
          text: 'Update title',
          cssClass: 'update',
          handler: () => {
            this.updateSong(songId, songTitle);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  };

  updateSong(songId, songTitle){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Update the name for this song",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: songTitle
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.songs.update(songId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
