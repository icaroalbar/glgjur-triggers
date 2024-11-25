type UserProps = {
  email?: string;
  zoneinfo?: string;
  password?: string;
  ativo?: boolean;
  oab?: string;
  perfil?: string;
  fone?: string;
  primeiro_nome?: string;
  ultimo_nome?: string;
  dt_criacao?: Date;
  id_cliente_amazon?: string;
  sub?: string;
  id_cliente_galgtec?: string;
  schema?: string;
  permissoes?: string;
};

export default class User {
  email?: string;
  zoneinfo?: string;
  password?: string;
  ativo?: boolean;
  oab?: string;
  perfil?: string;
  fone?: string;
  primeiro_nome?: string;
  ultimo_nome?: string;
  dt_criacao?: Date;
  sub?: string;
  id_cliente_galgtec?: string;
  schema?: string;
  permissoes?: string;

  constructor(props: UserProps) {
    this.email = props.email;
    this.zoneinfo = props.zoneinfo;
    this.ativo = props.ativo;
    this.oab = props.oab;
    this.perfil = props.perfil;
    this.fone = props.fone;
    this.primeiro_nome = props.primeiro_nome;
    this.ultimo_nome = props.ultimo_nome;
    this.dt_criacao = props.dt_criacao;
    this.sub = props.sub;
    this.id_cliente_galgtec = props.id_cliente_galgtec;
    this.schema = props.schema;
    this.permissoes = props.permissoes;
  }

  // activate() {
  //   this.ativo = true;
  // }

  // deactivate() {
  //   this.ativo = false;
  // }
}
