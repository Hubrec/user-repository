import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {User} from "../../services/user";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  styleUrls: ['index.component.scss'],
  templateUrl: 'index.component.html',
})
export class IndexComponent implements AfterViewInit {
  subtitle = 'Admin pannel'

  displayedColumns = ['id', 'name', 'occupation', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly usersService: UsersService,
              private readonly router: Router) { }


  ngAfterViewInit() {
    this.dataSource.data = this.usersService.getAllUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onNewUser() {
    this.router.navigate(['add']);
  }

  onEditUser(id: number) {
    this.router.navigate( ['update', id]);
  }

  onDeleteUser(id: number) {
    this.usersService.deleteUser(id);

    this.dataSource.data = this.usersService.getAllUsers();
  }

  onDetailsUser(id: number) {
    this.router.navigate( ['user', id]);

  }
}
