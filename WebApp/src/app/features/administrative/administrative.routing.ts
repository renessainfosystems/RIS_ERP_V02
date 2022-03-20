import { Routes } from '@angular/router';
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
import { LocationComponent } from '../administrative/location/location.component';
import { BankComponent } from '../administrative/bank/bank.component';
import { BankBranchComponent } from '../administrative/bank-branch/bank-branch.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { MfsComponent } from './mfs/mfs.component';
import { ZoneComponent } from './zone/zone.component';
import { AssociationComponent } from '../administrative/association/association.component';
import { EcommercePlatformComponent } from '../administrative/ecommerce-platform/ecommerce-platform.component';
import { RegistryAuthorityComponent } from '../administrative/registry-authority/registry-authority.component';
import { RegulatorComponent } from '../administrative/regulator/regulator.component';


export const AdministrativeRoutes: Routes = [
  
  {
    path: 'geo-area',
    component: CountryComponent
  },
  {
    path: 'division',
    component: DivisionComponent
  },
  {
    path: 'district',
    component: DistrictComponent
  },
  {
    path: 'zone',
    component: ZoneComponent
  },
 {
  path: 'company-corporate',
  component: CompanyCorporateComponent
  },
  {
    path: 'company-group',
    component: CompanyGroupComponent
  },
  {
    path: 'company',
    component: CompanyComponent
  },
  {
    path: 'competency',
    component: CompetencyComponent
  },
  {
    path: 'ind-sector',
    component: IndustrySectorComponent,
  },
  {
    path: 'ind-sub-sector',
    component: IndustrySubSectorComponent,
  },
  {
    path: 'ownership-type',
    component: OwnershipTypeComponent,
  },
  {
    path: 'currency',
    component: CurrencyComponent,
  },
  {
    path: 'company-business-nature',
    component: CompanyBusinessNatureComponent,
  },
  {
    path: 'position',
    component: PositionComponent,
  },
  {
    path: 'key-skill',
    component: KeySkillComponent,
  },
  {
    path: 'dep-type-config',
    component: DepartmentTypeConfigComponent,
  },  
  {
    path: 'designation',
    component: DesignationComponent,
  },
  {
    path: 'department',
    component: DepartmentComponent,
  },
  {
    path: 'vat-commissionerate',
    component: VatCommissionerateComponent,
  },
  {
    path: 'vat-division',
    component: VatDivisionComponent,
  },
  {
    path: 'vat-circle',
    component: VatCircleComponent,
  },  
  {
    path: 'location',
    component: LocationComponent,
  },
  
    {
    path: 'bank',
    component: BankComponent,
  },
  {
    path: 'bank-branch',
    component: BankBranchComponent,
  },
  {
    path: 'document-type',
    component: DocumentTypeComponent,
  },
  {
    path: 'mfs',
    component: MfsComponent,
  },
  {
    path: 'association',
    component: AssociationComponent,
  },
  {
    path: 'ecommerce-platform',
    component: EcommercePlatformComponent,
  },
  {
    path: 'registry-authority',
    component: RegistryAuthorityComponent,
  },
  {
    path: 'regulator',
    component: RegulatorComponent,
  },
  
];
