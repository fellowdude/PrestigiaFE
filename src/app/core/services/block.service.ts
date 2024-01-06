import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { GetBlock, Block, mapToAd } from '../models/block.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  constructor(private api: ApiService) {}

  getBlock(blockRoute: string): Observable<Block> {
    return this.api.get(`/block/data/${blockRoute}`).pipe(
      map((rawBlock: GetBlock) => {
        const block: Block = {
          transitionTime: rawBlock.transition_time,
          ads: mapToAd(rawBlock.content),
        };
        return block;
      })
    );
  }
}
