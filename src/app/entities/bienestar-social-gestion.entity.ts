import { environment } from "../../environments/environment.prod";

export class BienestarSocialGestion{
  private readonly base_url = environment.base_url;

  constructor(
    public id: string,
    public title: string,
    public year: number,
    public summary: string,
    public doc?: string,
    public createAt?: Date,
    public updateAt?: Date,
    public active?: boolean,
  ){}

  get documentUrl(){

    if( this.doc ){
      return `${this.base_url}/api/bienestar-social/loads/${ this.doc }`;
    }else{
      return `${this.base_url}/api/bienestar-social/loads/default.pdf`;
    }
  }
}
