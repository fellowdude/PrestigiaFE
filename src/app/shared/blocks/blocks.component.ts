import { Component, OnInit, Input } from '@angular/core';
import { BlockService } from 'src/app/core/services/block.service';
import { Block } from 'src/app/core/models/block.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
})
export class BlocksComponent implements OnInit {
  @Input() type: 'ad' | 'banner' = 'ad';
  @Input() amount: number = 7;
  block$: Observable<Block>;
  blockMobile$: Observable<Block>;

  swiperConfig: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false,
    autoplay: {
      delay: 10000,
    },
    centeredSlides: true,
  };

  constructor(private blockService: BlockService) {}

  ngOnInit(): void {
    this.block$ = this.blockService.getBlock(environment.BLOCK_ROUTE);
    this.blockMobile$ = this.blockService.getBlock(
      environment.BLOCK_ROUTE_MOBILE
    );
  }
}
