import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Product } from '../../../api/product';
import { ProductService } from '../../../service/productservice';

@Component({
    templateUrl: './list.component.html',
    styles: [`
    .product-badge {
    border-radius: var(--border-radius);
    padding: .25em .5rem;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: .3px;

    &.status-instock {
        background: #C8E6C9;
        color: #256029;
    }

    &.status-outofstock {
        background: #FFCDD2;
        color: #C63737;
    }

    &.status-lowstock {
        background: #FEEDAF;
        color: #8A5340;
    }
}

.customer-badge {
    border-radius: var(--border-radius);
    padding: .25em .5rem;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: .3px;

    &.status-qualified {
        background: #C8E6C9;
        color: #256029;
    }

    &.status-unqualified {
        background: #FFCDD2;
        color: #C63737;
    }

    &.status-negotiation {
        background: #FEEDAF;
        color: #8A5340;
    }

    &.status-new {
        background: #B3E5FC;
        color: #23547B;
    }

    &.status-renewal {
        background: #ECCFFF;
        color: #694382;
    }

    &.status-proposal {
        background: #FFD8B2;
        color: #805B36;
    }
}

.order-badge {
    border-radius: var(--border-radius);
    padding: .25em .5rem;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: .3px;

    &.order-delivered {
        background: #C8E6C9;
        color: #256029;
    }

    &.order-cancelled {
        background: #FFCDD2;
        color: #C63737;
    }

    &.order-pending {
        background: #FEEDAF;
        color: #8A5340;
    }

    &.order-returned {
        background: #ECCFFF;
        color: #694382;
    }
}


  `]
})
export class ListComponent implements OnInit {

    products: Product[];

    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    sourceCities: any[];

    targetCities: any[];

    orderCities: any[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.sourceCities = [
            {name: 'San Francisco', code: 'SF'},
            {name: 'London', code: 'LDN'},
            {name: 'Paris', code: 'PRS'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Berlin', code: 'BRL'},
            {name: 'Barcelona', code: 'BRC'},
            {name: 'Rome', code: 'RM'}];
        this.targetCities = [];

        this.orderCities = [
            {name: 'San Francisco', code: 'SF'},
            {name: 'London', code: 'LDN'},
            {name: 'Paris', code: 'PRS'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Berlin', code: 'BRL'},
            {name: 'Barcelona', code: 'BRC'},
            {name: 'Rome', code: 'RM'}];

        this.sortOptions = [
            {label: 'Price High to Low', value: '!price'},
            {label: 'Price Low to High', value: 'price'}
        ];
    }

    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
}
