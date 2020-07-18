import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoService } from './services/to-do.service';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconRegistry} from '@angular/material/icon';
import {
  MatIconModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  exports: [
    MatIconModule
  ],
  providers: [ToDoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
