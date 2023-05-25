import {Pipe, PipeTransform} from '@angular/core';
import {Author} from "../../Types/types";

@Pipe({
  name: 'browseBooks'
})
export class BrowseBooksPipe implements PipeTransform {

  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return this.subStringExist(it.authors, searchText) || it.title.toLocaleLowerCase().includes(searchText);
    });
  }

  private subStringExist(authors: Author[], searchText: string): boolean {
    let found = false;

    authors.forEach(item =>{
      if (item.name.toLocaleLowerCase().includes(searchText))
        found = true;
    })
    return found;
  }
}
