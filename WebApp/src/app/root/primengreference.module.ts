
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CalendarModule } from 'primeng/calendar';

import { ToastrModule } from 'ngx-toastr';

import { TreeTableModule } from 'primeng/treetable';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';

import { NO_ERRORS_SCHEMA } from '@angular/core';

// import the GridModule for the Grid component
import { PrimeNGConfig } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
// tf primeng start
import { TabViewModule } from 'primeng/tabview';
import {InputMaskModule} from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from "primeng/divider";
import {OverlayPanelModule} from 'primeng/overlaypanel';

import { TooltipModule } from 'primeng/tooltip';
import { KeyFilterModule } from 'primeng/keyfilter';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TreeModule } from 'primeng/tree';
import { SidebarModule } from 'primeng/sidebar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimelineModule } from 'primeng/timeline';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SplitterModule } from 'primeng/splitter';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { SkeletonModule } from 'primeng/skeleton';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ToolbarModule } from 'primeng/toolbar';
import { ScrollTopModule } from 'primeng/scrolltop';
import { BadgeModule } from 'primeng/badge';
import { ChartModule } from 'primeng/chart';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CarouselModule } from 'primeng/carousel';
import { TabMenuModule } from 'primeng/tabmenu';
import { TerminalModule } from 'primeng/terminal';
import { TreeSelectModule } from 'primeng/treeselect';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { StyleClassModule } from 'primeng/styleclass';
import { SliderModule } from 'primeng/slider';
import { SlideMenuModule } from 'primeng/slidemenu';
import { StepsModule } from 'primeng/steps';
import { ProgressBarModule } from 'primeng/progressbar';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RippleModule } from 'primeng/ripple';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DataViewModule } from 'primeng/dataview';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InplaceModule } from 'primeng/inplace';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { PaginatorModule } from 'primeng/paginator';
import { PickListModule } from 'primeng/picklist';
import { RatingModule } from 'primeng/rating';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const materialModules = [
  CdkTreeModule,
  
  OverlayModule,
  PortalModule,

  FormsModule,
  ReactiveFormsModule,


  TreeTableModule,
  AccordionModule,
  DialogModule,
  ButtonModule,
  DropdownModule,
  InputTextModule,
  FileUploadModule,
  FieldsetModule,
  CardModule,
  TableModule,
  ToastModule,
  //tf start
  TableModule,
  TabViewModule,
  CheckboxModule,
  PasswordModule,
  DividerModule,
  TableModule,
  InputMaskModule,
  OverlayPanelModule,
  TooltipModule,
  CalendarModule,
  KeyFilterModule,
  RadioButtonModule,
  ScrollPanelModule,
  ContextMenuModule,
  TreeModule,
    SidebarModule,
    ToastrModule,
    AvatarModule,
    AvatarGroupModule,
    TimelineModule,
    ToggleButtonModule,
    SplitButtonModule,
    SplitterModule,
    PanelModule,
    PanelMenuModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    SkeletonModule,
    MenuModule,
    MenubarModule,
    TagModule,
    ChipsModule,
    ChipModule,
    ToolbarModule,
    ScrollTopModule,
    BadgeModule,
    ChartModule,
    TieredMenuModule,
    MessageModule,
    MessagesModule,
    AutoCompleteModule,
  
    BreadcrumbModule,

    CarouselModule,
    CascadeSelectModule,
 
    CodeHighlighterModule,
 
    ColorPickerModule,
   
    DataViewModule,

    GalleriaModule,
    ImageModule,
    InplaceModule,
    InputNumberModule,

    InputSwitchModule,
   
    InputTextareaModule,
    KnobModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,

    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,

    PaginatorModule,
  
    PickListModule,
    ProgressBarModule,

    RatingModule,
    RippleModule,
   
    SelectButtonModule,

    SlideMenuModule,
    SliderModule,

    StepsModule,

    TabMenuModule,

    TerminalModule,

    TreeSelectModule,
  
    VirtualScrollerModule,
    StyleClassModule,
];

@NgModule({
  imports: [
    CommonModule,

    ...materialModules
  ],


  exports: [
    ...materialModules
  ]
})

export class PrimeNGModule { }
