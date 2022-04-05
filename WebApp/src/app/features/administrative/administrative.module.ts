import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from '../administrative/country/country.component';
import { DivisionComponent } from '../administrative/division/division.component';
import { DistrictComponent } from '../administrative/district/district.component';
import { CompanyCorporateComponent } from '../administrative/company-corporate/company-corporate.component';
import { CompetencyComponent } from '../administrative/competency/competency.component';
import { IndustrySectorComponent } from '../administrative/industry-sector/industry-sector.component';
import { IndustrySubSectorComponent } from '../administrative/industry-sub-sector/industry-sub-sector.component';
import { OwnershipTypeComponent } from '../administrative/ownership-type/ownership-type.component';
import { CompanyGroupComponent } from '../administrative/company-group/company-group.component';
import { CompanyComponent } from '../administrative/company/company.component';
import { CurrencyComponent } from '../administrative/currency/currency.component';
import { CompanyBusinessNatureComponent } from '../administrative/company-business-nature/company-business-nature.component';
import { PositionComponent } from '../administrative/position/position.component';
import { KeySkillComponent } from '../administrative/key-skill/key-skill.component';
import { DepartmentTypeConfigComponent } from '../administrative/department-type-config/department-type-config.component';
import { DesignationComponent } from '../administrative/designation/designation.component';
import { DepartmentComponent } from '../administrative/department/department.component';
import { VatCommissionerateComponent } from '../administrative/vat-commissionerate/vat-commissionerate.component';
import { VatDivisionComponent } from '../administrative/vat-division/vat-division.component';
import { VatCircleComponent } from '../administrative/vat-circle/vat-circle.component';
import { BankComponent } from '../administrative/bank/bank.component';
import { LocationComponent } from '../administrative/location/location.component';
import { BankBranchComponent } from '../administrative/bank-branch/bank-branch.component';
import { RouterModule } from '@angular/router';
import { AdministrativeRoutes } from './administrative.routing';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { MfsComponent } from './mfs/mfs.component';
import { ZoneComponent } from './zone/zone.component';
import { AssociationComponent } from '../administrative/association/association.component';
import { EcommercePlatformComponent } from '../administrative/ecommerce-platform/ecommerce-platform.component';
import { RegistryAuthorityComponent } from '../administrative/registry-authority/registry-authority.component';
import { RegulatorComponent } from '../administrative/regulator/regulator.component';
import { PrimeNGModule } from '../../root/primengreference.module';
import { OrganogramComponent } from './organogram/organogram.component';



@NgModule({
  imports: [
    CommonModule,
    PrimeNGModule,
    RouterModule.forChild(AdministrativeRoutes),
  ],
  declarations: [
    CountryComponent,
    DivisionComponent,
    DistrictComponent,
    CompanyCorporateComponent,
    CompetencyComponent,
    DistrictComponent,
    CompanyCorporateComponent,
    CompanyGroupComponent,
    CompanyComponent,
    CompetencyComponent,
    IndustrySectorComponent,
    IndustrySubSectorComponent,
    OwnershipTypeComponent,
    CurrencyComponent,
    CompanyBusinessNatureComponent,
    PositionComponent,
    KeySkillComponent,
    DepartmentTypeConfigComponent,
    DesignationComponent,
    DepartmentComponent,
    VatCommissionerateComponent,
    VatDivisionComponent,
    VatCircleComponent,
    BankComponent,
    LocationComponent,
    BankBranchComponent,
    DocumentTypeComponent,
    MfsComponent,
    ZoneComponent,
    AssociationComponent,
    RegistryAuthorityComponent,
    EcommercePlatformComponent,
    RegulatorComponent,
    OrganogramComponent,
  ]
  
})
export class AdministrativeModule { }
