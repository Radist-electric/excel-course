import 'core-js/stable'; // Вместо @babel/polyfill
import 'regenerator-runtime/runtime'; // Вместо @babel/polyfill
import './scss/index.scss';
import {Excel} from '@/components/excel/Excel';
import {Formula} from '@/components/excel/Formula';
import {Header} from '@/components/excel/Header';
import {Table} from '@/components/excel/Table';
import {Toolbar} from '@/components/excel/Toolbar';

const excel = new Excel('#app', {
	components: [Formula, Header, Table, Toolbar]
});

console.log('excel', excel);
